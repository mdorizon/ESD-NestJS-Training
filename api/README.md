# Description

TODO app, CRUD

# Schema BDD

```sql
  CREATE TABLE IF NOT EXISTS todo (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    done BOOLEAN DEFAULT false
  )
```

# Generate ressources

```bash

  # Development
  docker compose up -d
  
  nest generate resource task --no-spec
  nest g res task --no-spec
```