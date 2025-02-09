afterAll(async () => {
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));
});
