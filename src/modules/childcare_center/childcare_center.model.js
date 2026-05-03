const supabase = require('../../core/config/supabase');

const TABLE = 'childcare_center';

const findAll = async ({ page = 1, limit = 20 } = {}) => {
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  const { data, error, count } = await supabase
    .from(TABLE)
    .select('*', { count: 'exact' })
    .range(from, to);
  if (error) throw error;
  return { data, count };
};

const findById = async (id) => {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('center_id', id)
    .maybeSingle();
  if (error) throw error;
  return data;
};

const create = async (payload) => {
  const { data, error } = await supabase
    .from(TABLE)
    .insert(payload)
    .select()
    .single();
  if (error) throw error;
  return data;
};

const update = async (id, payload) => {
  const { data, error } = await supabase
    .from(TABLE)
    .update(payload)
    .eq('center_id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
};

const remove = async (id) => {
  const { error } = await supabase
    .from(TABLE)
    .delete()
    .eq('center_id', id);
  if (error) throw error;
};

module.exports = { findAll, findById, create, update, remove };
