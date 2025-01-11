---
title: "Why do you use react-hook-form?"
description: "You probably use react-hook-form or Formik for forms in React. Are you sure you need these libraries?"
pubDate: "Jan 11 2025"
categories: ["UI framework", "JavaScript"]
author: "sinskiy"
language: "english"
---

You probably use [react-hook-form](https://react-hook-form.com/) or [Formik](https://formik.org/) for forms in React. Are you sure you need these libraries?

I think using react-hook-form makes sense only if:

- [built-in HTML validation](https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation#validation-related_attributes) is enough for you
- the project doesn't interact with an API or interacts exclusively through forms

**In this case you can actually use react-hook-form to its full potential**, because you don't have to add schema validation (Zod, Valibot...) and data fetching (React Query, SWR...) libraries

react-hook-form provides [`<Form />`](https://react-hook-form.com/docs/useform/form) for conveniently sending data via forms, and also provides the ability to [safely use browser-like validation](https://react-hook-form.com/get-started#Applyvalidation). If you didn't know, attributes like required, minLength, max, etc. can be easily removed via the developer console. react-hook-form performs validation locally

If you use schema validation and data fetching libraries, they replace you `<Form />` and validation. There remain 2 useful features of react-hook-form that you can easily recreate yourself:

- `handleSubmit`
- `watch`

Let's add types first. `Parsed` is unique for each validation library, I show an example with [Zod](https://zod.dev/). This is the hardest part:

```ts
type Parsed<T> =
  | z.SafeParseSuccess<T>
  | (Omit<z.SafeParseError<T>, "error"> & {
      error: z.typeToFlattenedError<T>["fieldErrors"];
    });
type FormState<T> = Parsed<T> | undefined;
```

Now let's add two very simple functions:

```ts
function onSubmit<T>(
  e: FormEvent<HTMLFormElement>,
  schema: z.Schema<T>,
): Parsed<T> {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);

  const result = schema.safeParse(Object.fromEntries(formData));
  if (!result.success) {
    return {
      ...result,
      error: result.error.flatten().fieldErrors,
    };
  }
  return result;
}

function useWatch<T>() {
  const [values, setValues] = useState<Partial<T>>({});

  function watch(e: ChangeEvent<HTMLInputElement>) {
    setValues({ ...values, [e.currentTarget.name]: e.currentTarget.value });
  }

  return [values, watch] as const;
}
```

I think I don't even need to explain how these functions work. Here are docs for [formData](https://developer.mozilla.org/en-US/docs/Web/API/FormData), [Object.fromEntries()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries), [Partial](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype) and [Omit](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys) in case you don't know about these. `onSubmit()` is also somewhat unique for each validation library, but you just need to apply validation

Usage example

```ts
import { ChangeEvent, FormEvent, useState } from "react";
import { z } from "zod";

export default function App() {
	const [result, setResult] = useState<FormState<LoginSchema>>();
	const handleSubmit = (parsed: Parsed<LoginSchema>) => setResult(parsed);

	const [values, watch] = useWatch<LoginSchema>();
	console.log(values.email);

	return (
		<form onSubmit={(e) => handleSubmit(onSubmit(e, LoginSchema))}>
			<input name="email" onChange={watch} />
			{result?.error?.email}
			<button>submit</button>
		</form>
	);
}

const LoginSchema = z.object({
	email: z
		.string({ message: "Your email must be a string." })
		.nonempty("Please enter your email.")
		.email("The email address is badly formatted."),
});

type LoginSchema = z.infer<typeof LoginSchema>;
```

The only downside is that checkboxes won't send the correct data on submit by default, but this is an exercise for you if you want to use this
