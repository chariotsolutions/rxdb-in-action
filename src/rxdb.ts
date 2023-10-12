import { createRxDatabase } from "rxdb";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";

const db = await createRxDatabase({
  name: "scientist_db",
  storage: getRxStorageDexie(),
});

const scientistSchema = {
  title: "scientist schema",
  version: 0,
  description: "describes a scientist and their contribution",
  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      type: "string",
      maxLength: 32,
    },
    name: {
      type: "string",
      index: true,
    },
    contribution: {
      type: "string",
    },
    wasNobelLaureate: {
      type: "boolean",
    },
    dateOfMajorAward: {
      type: "string",
      format: "date-time",
    },
    publishedPapersCount: {
      type: "integer",
    },
    awards: {
      type: "array",
      maxItems: 10,
      uniqueItems: true,
      items: {
        type: "string",
      },
    },
    contributionDetails: {
      type: "object",
      properties: {
        field: {
          type: "string",
        },
        specificRole: {
          type: "string",
        },
      },
      required: ["field", "specificRole"],
    },
  },
  required: ["id", "name", "contribution"],
};

await db.addCollections({
  scientists: {
    schema: scientistSchema,
  },
});

await db.scientists.bulkInsert([
  {
    id: "hopper-001",
    name: "Grace Hopper",
    contribution:
      "Development of COBOL programming language and popularizing 'debugging'.",
    wasNobelLaureate: false,
    dateOfMajorAward: "1969-01-01T00:00:00Z",
    publishedPapersCount: 50,
    awards: ["National Medal of Technology", "Presidential Medal of Freedom"],
    contributionDetails: {
      field: "Computer Science",
      specificRole: "Pioneering work in computer languages",
    },
  },
  {
    id: "curie-002",
    name: "Marie Curie",
    contribution:
      "Research on radioactivity and discovery of radium and polonium.",
    wasNobelLaureate: true,
    dateOfMajorAward: "1903-01-01T00:00:00Z",
    publishedPapersCount: 32,
    awards: ["Nobel Prize in Physics", "Nobel Prize in Chemistry"],
    contributionDetails: {
      field: "Physics and Chemistry",
      specificRole: "Discovery of new elements and research on radioactivity",
    },
  },
  {
    id: "lovelace-003",
    name: "Ada Lovelace",
    contribution:
      "First computer programmer and notes on Babbage's Analytical Engine.",
    wasNobelLaureate: false,
    dateOfMajorAward: "",
    publishedPapersCount: 1,
    awards: [],
    contributionDetails: {
      field: "Computer Science",
      specificRole: "Work on Analytical Engine",
    },
  },
  {
    id: "johnson-004",
    name: "Katherine Johnson",
    contribution:
      "Crucial role in NASA's early spaceflights with precise calculations.",
    wasNobelLaureate: false,
    dateOfMajorAward: "2015-11-24T00:00:00Z",
    publishedPapersCount: 26,
    awards: ["Presidential Medal of Freedom"],
    contributionDetails: {
      field: "Mathematics and Space",
      specificRole: "Precise trajectory calculations for space missions",
    },
  },
]);

export default db;
