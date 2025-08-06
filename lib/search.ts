import { Search } from "@upstash/search";

const ServerSearchClient = new Search({
  url: process.env.UPSTASH_SEARCH_REST_URL!,
  token: process.env.UPSTASH_SEARCH_REST_TOKEN!,
});

const index = ServerSearchClient.index<Props, Metadata>("main");

export { ServerSearchClient, index };
