BEGIN;
CREATE TABLE IF NOT EXISTS actions(
   id uuid PRIMARY KEY,
   purpose_id uuid references purposes(id) ON DELETE CASCADE,
   description VARCHAR (255) NOT NULL,
   period VARCHAR(255) NOT NULL,
   date DATE,
   order_number INTEGER NOT NULL,
   created_at timestamp,
   updated_at timestamp
);
COMMIT;
