import { createLogger } from "./logger";

describe("createLogger", () => {
  let warnSpy, errorSpy, debugSpy, infoSpy;

  beforeEach(() => {
    warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
    errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    debugSpy = jest.spyOn(console, "debug").mockImplementation(() => {});
    infoSpy = jest.spyOn(console, "info").mockImplementation(() => {});
  });

  afterEach(() => {
    warnSpy.mockRestore();
    errorSpy.mockRestore();
    debugSpy.mockRestore();
    infoSpy.mockRestore();
  });

  it("prefixes warn output with namespace", () => {
    const logger = createLogger("myHook");
    logger.warn("something wrong");
    expect(warnSpy).toHaveBeenCalledWith("[myHook]", "something wrong");
  });

  it("prefixes error output with namespace", () => {
    const logger = createLogger("myHook");
    logger.error("fatal", new Error("boom"));
    expect(errorSpy).toHaveBeenCalledWith(
      "[myHook]",
      "fatal",
      expect.any(Error),
    );
  });

  it("warn always fires (simulating production: isProd is false in test env)", () => {
    // In test env (MODE !== 'production'), all levels are active
    const logger = createLogger("testNS");
    logger.warn("msg");
    expect(warnSpy).toHaveBeenCalledWith("[testNS]", "msg");
  });

  it("debug fires in non-production environment", () => {
    const logger = createLogger("testNS");
    logger.debug("trace");
    expect(debugSpy).toHaveBeenCalledWith("[testNS]", "trace");
  });

  it("info fires in non-production environment", () => {
    const logger = createLogger("testNS");
    logger.info("detail");
    expect(infoSpy).toHaveBeenCalledWith("[testNS]", "detail");
  });
});
