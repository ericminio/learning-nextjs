import "@testing-library/jest-dom";
import React, { useState, useRef, useLayoutEffect, ComponentType } from "react";
import fs from "fs";
import path from "path";
import { closeConnection } from "./app/db/sql";

// Close the database connection pool after all tests
afterAll(async () => {
  await closeConnection();
});

jest.mock("@domain/uuid", () => ({
  uuid: jest.fn(() => "test-uuid"),
}));

const navigationRef: { current: (path: string) => void } = {
  current: () => {},
};

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: (path: string) => navigationRef.current(path),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

function findPages(dir: string, basePath: string = ""): string[] {
  const results: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.name.startsWith("_") || entry.name === "__tests__") continue;

    const fullPath = path.join(dir, entry.name);
    const routePath = basePath + "/" + entry.name;

    if (entry.isDirectory()) {
      results.push(...findPages(fullPath, routePath));
    } else if (entry.name === "page.tsx") {
      results.push(basePath || "/");
    }
  }

  return results;
}

function discoverRoutes(): Record<string, ComponentType> {
  const appDir = path.join(__dirname, "app");
  const routePaths = findPages(appDir);

  const routes: Record<string, ComponentType> = {};

  for (const routePath of routePaths) {
    const filePath =
      routePath === "/"
        ? path.join(appDir, "page.tsx")
        : path.join(appDir, routePath, "page.tsx");
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const pageModule = require(filePath);
    routes[routePath] = pageModule.default;
  }

  return routes;
}

const routes = discoverRoutes();

export function AppRouter({
  initialRoute = "/",
}: { initialRoute?: string } = {}) {
  const [route, setRoute] = useState(initialRoute);
  const setRouteRef = useRef(setRoute);
  setRouteRef.current = setRoute;

  useLayoutEffect(() => {
    navigationRef.current = (path: string) => setRouteRef.current(path);
    return () => {
      navigationRef.current = () => {};
    };
  }, []);

  const Page = routes[route] ?? routes["/"];
  return React.createElement(Page);
}
