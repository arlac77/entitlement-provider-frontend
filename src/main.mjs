import { Router, route, NotFound, Guard } from "svelte-guard-history-router";
import { Session } from "svelte-session-manager";
import Home from "./pages/Home.svelte";
import About from "./pages/About.svelte";
import Login from "./pages/Login.svelte";
import App from "./App.svelte";
import { config } from "../package.json";

export const session = new Session(localStorage);

class SessionGuard extends Guard {
  async enter(transition) {
    if (!session.isValid) {
      return transition.redirect("/login");
    }
  }
}

const needsSession = new SessionGuard();

export const router = new Router(
  [
    route("*", NotFound),
    route("/*", Home),
    route("/login", Login),
    route("/about", About)
  ],
  config.base
);


export default new App({
  target: document.body
});
