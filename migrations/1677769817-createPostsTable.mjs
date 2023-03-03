export async function up(sql) {
  await sql`
  CREATE TABLE posts (
      id SERIAL PRIMARY KEY,
      text VARCHAR(400) NOT NULL,
      user_id INTEGER REFERENCES users(id)
     );
`;
}

export async function down(sql) {
  await sql`
  drop TABLE posts;
`;
}
