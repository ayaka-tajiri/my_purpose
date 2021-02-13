CREATE UNIQUE INDEX index_unique_actions_purpose_id_order_number ON actions USING BTREE (purpose_id, order_number)
