import { supabase } from "./lib/supabaseClient";
import type { Van } from "./types/van";

const DEFAULT_HOST_ID = "123";

type SupabaseVanRow = Omit<Van, "imageUrl" | "hostId"> & {
  image_url: string | null;
  thanks?: string | null;
  host_id?: string | null;
  hostId?: string | null;
};

function mapVan(row: SupabaseVanRow): Van {
  const { image_url, host_id, hostId, thanks, ...van } = row;
  const resolvedHostId = host_id ?? hostId ?? "";
  return {
    ...van,
    hostId: resolvedHostId === "" ? "" : String(resolvedHostId),
    imageUrl: image_url ?? "",
    thanks: thanks ?? "",
  };
}

export function getVans(): Promise<Van[]>;
export function getVans(id: string): Promise<Van>;
export async function getVans(id?: string): Promise<Van | Van[]> {
  const baseQuery = supabase.from("vans").select("*");
  const query = id ? baseQuery.eq("id", id).maybeSingle() : baseQuery;
  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  if (id) {
    if (!data) {
      throw new Error(`Van with id ${id} not found`);
    }
    return mapVan(data as SupabaseVanRow);
  }

  return (data as SupabaseVanRow[] | null)?.map(mapVan) ?? [];
}


export function getHostVans(): Promise<Van[]>;
export function getHostVans(id: string): Promise<Van>;
export async function getHostVans(id?: string): Promise<Van | Van[]> {
  if (id) {
    const van = await getVans(id);
    if (van.hostId && van.hostId !== DEFAULT_HOST_ID) {
      throw new Error("Not authorized to access this van");
    }
    return van;
  }

  const vans = await getVans();
  return vans.filter((van) => van.hostId === DEFAULT_HOST_ID);
}


export async function loginUser(creds: { email: string; password: string }) {
  const validEmail = "e@e.com";
  const validPassword = "1234";

  return new Promise<{
    user: { email: string; id: string; name: string };
    token: string;
  }>((resolve, reject) => {
    setTimeout(() => {
      if (!creds.email || !creds.password) {
        reject(new Error("Email and password are required"));
        return;
      }

      if (creds.email !== validEmail || creds.password !== validPassword) {
        reject(new Error("Wrong email or password"));
        return;
      }

      resolve({
        user: {
          email: creds.email,
          id: "demo-user",
          name: "Demo User",
        },
        token: "demo-token",
      });
    }, 400);
  });
}
