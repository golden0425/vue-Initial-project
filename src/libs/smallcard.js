export function smallcard(
  vm = this,
  successCallbackFn,
  catchCallbackFn = null
) {
  vm.$confirm("是否打印小票？, 是否继续?", "提示", {
    confirmButtonText: "打印确认",
    cancelButtonText: "取消打印",
    type: "warning"
  })
    .then(() => {
      successCallbackFn;
    })
    .catch(() => {
      catchCallbackFn;
    });
}
