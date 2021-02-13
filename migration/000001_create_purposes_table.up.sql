BEGIN;
CREATE TABLE IF NOT EXISTS purposes(
   id uuid PRIMARY KEY,
   description VARCHAR (255) NOT NULL,
   user_id VARCHAR (255) NOT NULL,
   created_at timestamp,
   updated_at timestamp
);
COMMIT;
