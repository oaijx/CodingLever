<template>
  <div class="calc">
    <div class="calc-display">
      <input class="calc-input" v-model="expr" placeholder="输入表达式，例如：(1+2)*3/4" />
      <div class="calc-result">{{ resultText }}</div>
    </div>
    <div class="calc-grid">
      <button v-for="b in buttons" :key="b.text" @click="onPress(b)" :class="b.class">{{ b.text }}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
const expr = ref('')
const result = ref<string | null>(null)
const error = ref<string | null>(null)
const allowed = /^[0-9+\-*/().%\s]+$/
function safeEval(code: string): number {
  if (!allowed.test(code)) throw new Error('非法字符')
  // eslint-disable-next-line no-new-func
  const fn = new Function(`return (${code})`)
  const v = fn()
  if (typeof v !== 'number' || !isFinite(v)) throw new Error('计算错误')
  return v
}
function calc() {
  try {
    const v = safeEval(expr.value)
    result.value = String(v)
    error.value = null
  } catch (e: any) {
    result.value = null
    error.value = e?.message || '错误'
  }
}
function clearAll() {
  expr.value = ''
  result.value = null
  error.value = null
}
function delOne() {
  expr.value = expr.value.slice(0, -1)
}
const buttons = [
  { text: '7' }, { text: '8' }, { text: '9' }, { text: '/' },
  { text: '4' }, { text: '5' }, { text: '6' }, { text: '*' },
  { text: '1' }, { text: '2' }, { text: '3' }, { text: '-' },
  { text: '0' }, { text: '.' }, { text: '(' }, { text: ')' },
  { text: '%' }, { text: '+' }, { text: 'DEL', class: 'warn' }, { text: 'AC', class: 'warn' },
  { text: '=', class: 'primary wide' }
] as const
function onPress(b: { text: string }) {
  const t = b.text
  if (t === '=') return calc()
  if (t === 'AC') return clearAll()
  if (t === 'DEL') return delOne()
  expr.value += t
}
const resultText = computed(() => {
  if (error.value) return error.value
  if (result.value !== null) return result.value
  return ''
})
</script>

<style scoped>
.calc {
  max-width: 520px;
  margin: 16px 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  overflow: hidden;
}
.calc-display {
  padding: 12px;
  border-bottom: 1px solid var(--vp-c-divider);
}
.calc-input {
  width: 100%;
  font-size: 16px;
  padding: 8px 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}
.calc-result {
  min-height: 24px;
  margin-top: 8px;
  font-weight: 600;
  color: var(--vp-c-brand-1);
}
.calc-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  padding: 12px;
}
.calc-grid button {
  padding: 10px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-weight: 600;
}
.calc-grid button.primary {
  background: var(--vp-c-brand-1);
  color: white;
  border-color: var(--vp-c-brand-1);
}
.calc-grid button.wide {
  grid-column: span 4;
}
.calc-grid button.warn {
  background: var(--vp-c-bg-alt);
}
</style>
