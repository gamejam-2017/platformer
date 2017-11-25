export default function(SuperClass) {
  return new MixinBuilder(SuperClass);
}

class MixinBuilder {
  constructor(SuperClass) {
    this.superclass = SuperClass
  }
  with(...mixins) {
    return mixins.reduce((c, mixin) => mixin(c), this.superclass);
  }
}
