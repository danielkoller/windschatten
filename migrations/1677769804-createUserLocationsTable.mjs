export async function up(sql) {
  await sql`
  CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(80) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL UNIQUE,
      home_district VARCHAR(80) NOT NULL,
      work_district VARCHAR(50) NOT NULL,
      profile_pic TEXT
    );
`;
}

export async function down(sql) {
  await sql`
    DROP TABLE users;
    `;
}
