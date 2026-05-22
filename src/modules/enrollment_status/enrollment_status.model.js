const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase URL or anon key in environment variables.");
}

const supabase = createClient(supabaseUrl, supabaseKey);

exports.getAllEnrollmentStatus = async () => {
  const { data, error } = await supabase
    .from("enrollment_status")
    .select("*")
    .order("enrollment_id", { ascending: true });

  if (error) throw error;
  return data;
};

exports.getEnrollmentStatusById = async (id) => {
  const { data, error } = await supabase
    .from("enrollment_status")
    .select("*")
    .eq("enrollment_id", id)
    .single();

  if (error) throw error;
  return data;
};

exports.getEnrollmentStatusByCenterId = async (centerId) => {
  const { data, error } = await supabase
    .from("enrollment_status")
    .select("*")
    .eq("center_id", centerId)
    .order("enrollment_id", { ascending: true });

  if (error) throw error;
  return data;
};

exports.createEnrollmentStatus = async (record) => {
  const payload = {
    ...record,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("enrollment_status")
    .insert([payload])
    .select();

  if (error) throw error;
  return data;
};

exports.updateEnrollmentStatus = async (id, updates) => {
  const payload = {
    ...updates,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("enrollment_status")
    .update(payload)
    .eq("enrollment_id", id)
    .select();

  if (error) throw error;
  return data;
};

exports.deleteEnrollmentStatus = async (id) => {
  const { error } = await supabase
    .from("enrollment_status")
    .delete()
    .eq("enrollment_id", id);

  if (error) throw error;

  return {
    message: "Enrollment status deleted successfully",
  };
};
