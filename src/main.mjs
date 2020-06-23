import { BaseRouter, route, Guard } from "svelte-guard-history-router";
import { Session } from "svelte-session-manager";
//import Home from "./pages/Home.svelte";
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

export const needsSession = new SessionGuard();

export const router = new BaseRouter(
  [
    //route("*", Home)
  ],
  base
);

export default new App({
  target: document.body
});
