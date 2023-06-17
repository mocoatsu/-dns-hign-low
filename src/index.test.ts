import { ipToNumber, lookup } from ".";
import assert from "assert";

describe("ipToNumber", () => {
  it("should convert an IP address to a number", () => {
    assert.strictEqual(ipToNumber("0.0.0.0"), 0);
    assert.strictEqual(ipToNumber("255.255.255.255"), 255255255255);
    assert.strictEqual(ipToNumber("192.168.1.1"), 192168001001);
  });
});

describe("lookup", () => {
  it("should resolve a domain to an IP address", async () => {
    const ip = await lookup("example.com");
    assert.ok(ip);
  });
});
