const { createClient } = require("@supabase/supabase-js");

const SUPABASE_URL = "https://rfzavcliggzlpkqqcrzr.supabase.co";

const SUPABASE_KEY = "sb_publishable_48pF8e_sZQP5MQXKkeeTOQ_pfESdvZV";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

exports.getAllGovernmentEvaluations = async () => {
  const { data, error } = await supabase
    .from("evaluation_record")
    .select("*")
    .order("evaluation_id", {
      ascending: true,
    });

  if (error) {
    throw error;
  }

  return data;
};

exports.getGovernmentEvaluationById = async (id) => {
  const { data, error } = await supabase
    .from("evaluation_record")
    .select("*")
    .eq("evaluation_id", id)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

exports.createGovernmentEvaluation = async (governmentEvaluation) => {
  const { data, error } = await supabase
    .from("evaluation_record")
    .insert([governmentEvaluation])
    .select();

  if (error) {
    throw error;
  }

  return data;
};

exports.updateGovernmentEvaluation = async (id, updates) => {
  const { data, error } = await supabase
    .from("evaluation_record")
    .update(updates)
    .eq("evaluation_id", id)
    .select();

  if (error) {
    throw error;
  }

  return data;
};

exports.deleteGovernmentEvaluation = async (id) => {
  const { error } = await supabase
    .from("evaluation_record")
    .delete()
    .eq("evaluation_id", id);

  if (error) {
    throw error;
  }

  return {
    message: "Government evaluation deleted successfully",
  };
};
