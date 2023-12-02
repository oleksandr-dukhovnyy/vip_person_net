export default function useIsOnline(refedVar: Ref<any>) {
  onMounted(() => {
    window.addEventListener(
      'online',
      onStatusChanged.bind(null, refedVar, true)
    );
    window.addEventListener(
      'offline',
      onStatusChanged.bind(null, refedVar, false)
    );

    refedVar.value = globalThis.navigator?.onLine || false;
  });

  function unwatch() {
    window.removeEventListener(
      'online',
      onStatusChanged as unknown as EventListener
    );
    window.removeEventListener(
      'offline',
      onStatusChanged as unknown as EventListener
    );
  }

  function onStatusChanged(refedVar: Ref<boolean>, status: boolean) {
    refedVar.value = status;
  }

  onUnmounted(unwatch);

  return unwatch;
}
