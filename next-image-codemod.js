/**
 * This codemod replaces the deprecated `layout` prop in Next.js Image components
 * with the new `fill` or `responsive` props.
 */

export default function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);

  root
    .find(j.JSXOpeningElement, { name: { name: 'Image' } })
    .forEach((path) => {
      const attributes = path.node.attributes;
      let layoutAttrIndex = -1;
      let layoutValue = '';

      // Find the `layout` attribute
      attributes.forEach((attr, index) => {
        if (attr.name && attr.name.name === 'layout') {
          layoutAttrIndex = index;
          if (attr.value.type === 'StringLiteral') {
            layoutValue = attr.value.value;
          }
        }
      });

      if (layoutAttrIndex !== -1) {
        // Remove the `layout` attribute
        attributes.splice(layoutAttrIndex, 1);

        // Add the new prop based on the layout value
        if (layoutValue === 'fill') {
          attributes.push(j.jsxAttribute(j.jsxIdentifier('fill'), null));
        } else if (layoutValue === 'responsive') {
          attributes.push(j.jsxAttribute(j.jsxIdentifier('responsive'), null));
        } else if (layoutValue === 'intrinsic') {
          // No direct replacement needed for intrinsic in newer versions
          // You might handle it based on your specific requirements
        }
      }
    });

  return root.toSource();
}
