export const weather = async (value) => {
  if (value === null) {
    sessionStorage.getItem("BrowserLocation");
  }
  const api_url = `/weather/${value}`;
  const res = await fetch(api_url);
  const data = await res.json();
  return data;
};
