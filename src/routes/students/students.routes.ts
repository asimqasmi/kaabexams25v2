import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { createErrorSchema, IdParamsSchema } from "stoker/openapi/schemas";

import {
  insertstudentsSchema,
  patchstudentsSchema,
  selectstudentsSchema,
} from "@/db/schema/students";
import { notFoundSchema } from "@/lib/constants";

const tags = ["students"];

export const list = createRoute({
  path: "/students",
  method: "get",
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(selectstudentsSchema),
      "The list of students",
    ),
  },
});

export const create = createRoute({
  path: "/students",
  method: "post",
  request: {
    body: jsonContentRequired(insertstudentsSchema, "The student to create"),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      selectstudentsSchema,
      "The created student",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(insertstudentsSchema),
      "The validation error(s)",
    ),
  },
});

export const getOne = createRoute({
  path: "/students/{id}",
  method: "get",
  request: {
    params: IdParamsSchema,
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      selectstudentsSchema,
      "The requested student",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "student not found",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      "Invalid id error",
    ),
  },
});

export const patch = createRoute({
  path: "/students/{id}",
  method: "patch",
  request: {
    params: IdParamsSchema,
    body: jsonContentRequired(patchstudentsSchema, "The student updates"),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      selectstudentsSchema,
      "The updated student",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "student not found",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(patchstudentsSchema).or(
        createErrorSchema(IdParamsSchema),
      ),
      "The validation error(s)",
    ),
  },
});

export const remove = createRoute({
  path: "/students/{id}",
  method: "delete",
  request: {
    params: IdParamsSchema,
  },
  tags,
  responses: {
    [HttpStatusCodes.NO_CONTENT]: {
      description: "student deleted",
    },
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "student not found",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      "Invalid id error",
    ),
  },
});

export type ListRoute = typeof list;
export type CreateRoute = typeof create;
export type GetOneRoute = typeof getOne;
export type PatchRoute = typeof patch;
export type RemoveRoute = typeof remove;
