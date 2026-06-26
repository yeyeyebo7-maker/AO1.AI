import { expect, test } from "bun:test"
import { Schema } from "effect"
import { AgentV2 } from "@ao1-ai/core/agent"
import { Location as CoreLocation } from "@ao1-ai/core/location"
import { ModelV2 } from "@ao1-ai/core/model"
import { SessionV2 } from "@ao1-ai/core/session"
import { SessionInput as CoreSessionInput } from "@ao1-ai/core/session/input"
import { SessionMessage as CoreSessionMessage } from "@ao1-ai/core/session/message"
import { Prompt as CorePrompt } from "@ao1-ai/core/session/prompt"
import { Agent } from "@ao1-ai/schema/agent"
import { Location } from "@ao1-ai/schema/location"
import { Model } from "@ao1-ai/schema/model"
import { Project } from "@ao1-ai/schema/project"
import { Provider } from "@ao1-ai/schema/provider"
import { Prompt } from "@ao1-ai/schema/prompt"
import { Session } from "@ao1-ai/schema/session"
import { SessionInput } from "@ao1-ai/schema/session-input"
import { SessionMessage } from "@ao1-ai/schema/session-message"
import { Workspace } from "@ao1-ai/schema/workspace"
import { Api } from "@ao1-ai/server/api"
import { compile, emitPromise } from "@ao1-ai/httpapi-codegen"
import { HttpApi } from "effect/unstable/httpapi"
import { SessionGroup } from "../src/contract"

test("Core and Server reuse the authoritative Schema and Protocol values", () => {
  expect(AgentV2.ID).toBe(Agent.ID)
  expect(CoreLocation.Ref).toBe(Location.Ref)
  expect(ModelV2.Ref).toBe(Model.Ref)
  expect(SessionV2.Info).toBe(Session.Info)
  expect(CoreSessionInput.Admitted).toBe(SessionInput.Admitted)
  expect(CoreSessionMessage.Message).toBe(SessionMessage.Message)
  expect(CorePrompt).toBe(Prompt)
  expect(Api.groups["server.session"].identifier).toBe("server.session")
  expect(SessionGroup.identifier).toBe(Api.groups["server.session"].identifier)
  expect(Session.ID.create()).toStartWith("ses_")
  expect(Project.ID.global).toBe("global")
  expect(Provider.ID.anthropic).toBe("anthropic")
  expect(Workspace.ID.create()).toStartWith("wrk_")
})

test("client and Server Session contracts generate identically", () => {
  const options = { groupNames: { "server.session": "sessions" } }
  const server = compile(HttpApi.make("server").add(Api.groups["server.session"]), options)
  const client = compile(HttpApi.make("client").add(SessionGroup), options)

  expect(emitPromise(client)).toEqual(emitPromise(server))
})

test("shared DTO schemas construct and decode plain objects", () => {
  const made = Prompt.make({ text: "hello" })
  const decoded = Schema.decodeUnknownSync(Prompt)({ text: "hello" })
  const content = Schema.decodeUnknownSync(SessionMessage.AssistantText)({ type: "text", id: "part_1", text: "hi" })

  expect(Object.getPrototypeOf(made)).toBe(Object.prototype)
  expect(Object.getPrototypeOf(decoded)).toBe(Object.prototype)
  expect(Object.getPrototypeOf(content)).toBe(Object.prototype)
  expect(Prompt.ast.annotations?.identifier).toBe("Prompt")
  expect(SessionMessage.AssistantText.ast.annotations?.identifier).toBe("Session.Message.Assistant.Text")
  expect(CoreSessionMessage.AssistantText).toBe(SessionMessage.AssistantText)
})
