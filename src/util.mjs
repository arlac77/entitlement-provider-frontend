import { api } from "./constants.mjs";

export async function* fetchIterator(path, factory, session, transition) {
  const response = await fetch(api + path, {
    headers: {
      ...session.authorizationHeader
    }
  });

  if (response.ok) {
    for (const u of await response.json()) {
      yield new factory(u);
    }
  }
}

export async function fetchObject(path, factory, session) {
  const response = await fetch(api + path, {
    headers: {
      ...session.authorizationHeader
    }
  });
  if (response.ok) {
    return new factory(await response.json());
  }
}
