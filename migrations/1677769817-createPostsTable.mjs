export async function up(sql) {
  await sql`
  CREATE TABLE posts (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      content VARCHAR(400) NOT NULL,
      user_id integer NOT NULL REFERENCES users (id) ON DELETE CASCADE
     );
`;
}

export async function down(sql) {
  await sql`
  drop TABLE posts;
`;
}
