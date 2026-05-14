const { createClient } = require("@supabase/supabase-js");

const SUPABASE_URL = "https://rfzavcliggzlpkqqcrzr.supabase.co";

const SUPABASE_KEY = "sb_publishable_48pF8e_sZQP5MQXKkeeTOQ_pfESdvZV";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

exports.getAllStaff = async () => {
  const { data, error } = await supabase
    .from("staff")
    .select("*")
    .order("staff_id", {
      ascending: true,
    });

  if (error) {
    throw error;
  }

  return data;
};

exports.getStaffById = async (id) => {
  const { data, error } = await supabase
    .from("staff")
    .select("*")
    .eq("staff_id", id)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

exports.createStaff = async (staff) => {
  const { data, error } = await supabase.from("staff").insert([staff]).select();

  if (error) {
    throw error;
  }

  return data;
};

exports.updateStaff = async (id, updates) => {
  const { data, error } = await supabase
    .from("staff")
    .update(updates)
    .eq("staff_id", id)
    .select();

  if (error) {
    throw error;
  }

  return data;
};

exports.deleteStaff = async (id) => {
  const { error } = await supabase.from("staff").delete().eq("staff_id", id);

  if (error) {
    throw error;
  }

  return {
    message: "Staff deleted successfully",
  };
};
