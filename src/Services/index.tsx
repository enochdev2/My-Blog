export const fetchBlog = async () => {
  const res = await fetch(`http://localhost:3000/api/blog`) 
  const data = res.json();
  return data;
}
export const fetchSingleBlog = async (id:string | number) => {
  const res = await fetch(`http://localhost:3000/api/blog/${id}`) 
  const data = res.json();
  return data;
}