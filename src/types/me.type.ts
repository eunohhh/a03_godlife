import { User } from "@supabase/supabase-js";
import { Tables } from "./supabase";

export type Me = User & {
    userTableInfo: Tables<"users">;
};

export type Users = Tables<"users">;
