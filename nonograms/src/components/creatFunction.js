export function create(
    element,
    className = undefined,
    content = '',
    id = undefined
  ) {
  const node = document.createElement(element);
  if (id) node.id = id;
  if (className) node.className = className;
  node.innerHTML = content;
  return node;
}