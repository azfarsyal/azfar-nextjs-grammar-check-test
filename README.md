# Grammar Checking Application
This web application is built for the test purpose and it provided the live preview for grammar mistakes within an english language, constrained to 1000 characters.

This web application use 3rd party API for Grammar Mistake Checking: [Language Tool API](https://languagetool.org/http-api/swagger-ui/#!/default/)
- The usage of aforementioned API could be limited as this project is using free version of the API, so test for basic grammar mistakes rather than advance grammar mistakes.

## How to test and get logged in?
You can test this app at: [https://azfar-nextjs-grammar-check-test.vercel.app/](https://azfar-nextjs-grammar-check-test.vercel.app/)

This web application uses the minimalistic Authentication for demonstration purposes only, so login using following credentials:
- username: azfar
- password: Admin@123

## Screenshots
- ### Preview when there are grammar mistakes:

![Highlighted Grammar Mistakes](https://ur00v1bupg5fagyd.public.blob.vercel-storage.com/images/readme/Live%20Grammer%20Checker%20Error.png)

- ### Preview when the grammar is correct:

![Correct Grammar View](https://ur00v1bupg5fagyd.public.blob.vercel-storage.com/images/readme/Live%20Grammer%20Checker%20Success.png)

## Getting Started Locally

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Environment Variables required
- USER_NAME={Set User Name against which you will be logged in}
- USER_PASSWORD={Set User Password against which you will be logged in}
- JWT_SECRET_KEY={JWT secret key of your choice}
- GRAMMAR_API_BASE_URL='https://api.languagetoolplus.com/v2'

# Author

- **Name:** Azfar Syal
- **Portfolio:** [www.azfarsyal.com](www.azfarsyal.com)
