import withLayout from './withLayout';

const compose = (...fns) => (component) =>
  fns.reduceRight((acc, fn) => fn(acc), component);

const page = compose(withLayout);

export default page;
