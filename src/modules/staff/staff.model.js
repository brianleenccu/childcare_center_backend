const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase URL or anon key in environment variables.");
}

const supabase = createClient(supabaseUrl, supabaseKey);

exports.getAllStaff = async () => {
  const { data, error } = await supabase
    .from("staff")
    .select("*")
    .order("staff_id", { ascending: true });

  if (error) throw error;
  return data;
};

exports.getStaffById = async (id) => {
  const { data, error } = await supabase
    .from("staff")
    .select("*")
    .eq("staff_id", id)
    .single();

  if (error) throw error;
  return data;
};

exports.getStaffByCenterId = async (centerId) => {
  const { data, error } = await supabase
    .from("staff")
    .select("*")
    .eq("center_id", centerId)
    .order("staff_id", { ascending: true });

  if (error) throw error;
  return data;
};

exports.createStaff = async (staff) => {
  const { data, error } = await supabase.from("staff").insert([staff]).select();

  if (error) throw error;
  return data;
};

exports.updateStaff = async (id, updates) => {
  const { data, error } = await supabase
    .from("staff")
    .update(updates)
    .eq("staff_id", id)
    .select();

  if (error) throw error;
  return data;
};

exports.deleteStaff = async (id) => {
  const { error } = await supabase.from("staff").delete().eq("staff_id", id);

  if (error) throw error;

  return {
    message: "Staff deleted successfully",
  };
};
