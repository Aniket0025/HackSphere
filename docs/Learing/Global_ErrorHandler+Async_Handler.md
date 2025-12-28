##Global Error Handler + Async Handler (Implementation Notes)
Where It Is Used

All controllers

Centralized error responses

Handles async errors without try-catch everywhere

📦 Package Installation
npm install express-async-handler

⚙️ Async Handler – How Used in Code

Purpose

Automatically catches async errors in controllers

Setup

```js

// middleware/asyncHandler.js
import asyncHandler from "express-async-handler";

export default asyncHandler;
```

Used In Controllers

```js

import asyncHandler from "../middleware/asyncHandler.js";

export const registerUser = asyncHandler(async (req, res) => {
  // async code
  res.status(201).json({ message: "User registered" });
});

```


🚨 Global Error Handler – How Used in Code

Purpose

Handle all errors in one place

Send clean error responses

Setup

```js

// middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Server Error"
  });
};

export default errorHandler;
```


🔗 Applied in Server File

```js
// server.js
import errorHandler from "./middleware/errorHandler.js";

app.use(errorHandler);
```

🔐 Coding Checklist

Use asyncHandler in every controller

Throw errors using throw new Error()

Do not write try-catch in controllers

Keep error response consistent

✅ Status

✔ Async handler integrated
✔ Global error handler working
✔ Cleaner controller code

💡 Why This Is Important

✔ Less boilerplate
✔ Centralized error logic
✔ Production-ready backend