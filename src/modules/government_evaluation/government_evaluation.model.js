const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase URL or anon key in environment variables.");
}

const supabase = createClient(supabaseUrl, supabaseKey);

exports.getAllGovernmentEvaluations = async () => {
  const { data, error } = await supabase
    .from("evaluation_record")
    .select("*")
    .order("evaluation_id", { ascending: true });

  if (error) throw error;
  return data;
};

exports.getGovernmentEvaluationById = async (id) => {
  const { data, error } = await supabase
    .from("evaluation_record")
    .select("*")
    .eq("evaluation_id", id)
    .single();

  if (error) throw error;
  return data;
};

exports.getGovernmentEvaluationsByCenterId = async (centerId) => {
  const { data, error } = await supabase
    .from("evaluation_record")
    .select("*")
    .eq("center_id", centerId)
    .order("completion_date", { ascending: false });

  if (error) throw error;
  return data;
};

exports.createGovernmentEvaluation = async (record) => {
  const { data, error } = await supabase
    .from("evaluation_record")
    .insert([record])
    .select();

  if (error) throw error;
  return data;
};

exports.updateGovernmentEvaluation = async (id, updates) => {
  const { data, error } = await supabase
    .from("evaluation_record")
    .update(updates)
    .eq("evaluation_id", id)
    .select();

  if (error) throw error;
  return data;
};

exports.deleteGovernmentEvaluation = async (id) => {
  const { error } = await supabase
    .from("evaluation_record")
    .delete()
    .eq("evaluation_id", id);

  if (error) throw error;

  return {
    message: "Government evaluation deleted successfully",
  };
};
