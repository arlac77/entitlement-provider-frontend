import { Router, route, NotFound, Guard } from "svelte-guard-history-router";
import { Session } from "svelte-session-manager";
import Home from "./pages/Home.svelte";
import About from "./pages/About.svelte";
import Entitlements from "./pages/Entitlements.svelte";
import Services from "./pages/Services.svelte";
import Login from "./pages/Login.svelte";
import App from "./App.svelte";
import base from 'consts:base';

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
    route("/entitlements", needsSession, Entitlements),
    route("/services", needsSession, Services),
    route("/about", needsSession, About)
  ],
  base
);

export default new App({
  target: document.body
});
