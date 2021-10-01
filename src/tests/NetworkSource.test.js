import {retrieveSocialNetworkSource} from "../utilities/Helper";

describe("Retrieving the source of the displayed ad", () => {
  it("Should return 'google' if the url includes 'google'", () => {
    const retrievedSource = retrieveSocialNetworkSource("https://www.google.com/something-else");
    expect(retrievedSource).toBe("google");
  });

  it("Should return 'facebook' if the url includes 'facebook'", () => {
    const retrievedSource = retrieveSocialNetworkSource("https://www.facebook.com/something-else");
    expect(retrievedSource).toBe("facebook");
  });

  it("Should return 'tiktok' if the url includes 'tiktok'", () => {
    const retrievedSource = retrieveSocialNetworkSource("https://www.tiktok.com/something-else");
    expect(retrievedSource).toBe("tiktok");
  });

  it("Should return 'unknown' if the url doesn't match google, tiktok or facebook", () => {
    const retrievedSource = retrieveSocialNetworkSource("https://www.somerandom.com/something-else");
    expect(retrievedSource).toBe("unknown");
  });
});
