import { useState, useEffect, useRef, useCallback } from "react";

function getReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useLiveValue(initial, { min = 0, max = Infinity, intervalMs = 7000, step = 1, tick = null } = {}) {
  const [value, setValue] = useState(initial);
  const [prevValue, setPrevValue] = useState(initial);
  const [updated, setUpdated] = useState(false);
  const reducedMotion = useRef(getReducedMotion());

  const tickRef = useRef(tick);
  const minRef = useRef(min);
  const maxRef = useRef(max);
  const stepRef = useRef(step);

  useEffect(() => { tickRef.current = tick; }, [tick]);
  useEffect(() => { minRef.current = min; }, [min]);
  useEffect(() => { maxRef.current = max; }, [max]);
  useEffect(() => { stepRef.current = step; }, [step]);

  const nudge = useCallback(() => {
    setPrevValue((pv) => {
      const delta = tickRef.current
        ? tickRef.current()
        : Math.round((Math.random() * stepRef.current * 2 - stepRef.current * 0.3));
      return Math.max(minRef.current, Math.min(maxRef.current, pv + delta));
    });
    setUpdated(true);
    setTimeout(() => setUpdated(false), 1200);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (document.hidden) return;
      nudge();
    }, intervalMs + Math.random() * 3000);
    return () => clearInterval(interval);
  }, [intervalMs, nudge]);

  useEffect(() => {
    setValue(prevValue);
  }, [prevValue]);

  return { value, prevValue, updated, reducedMotion: reducedMotion.current };
}

export function useAnimatedNumber(target, { duration = 900, reducedMotion = false } = {}) {
  const [display, setDisplay] = useState(target);
  const frameRef = useRef(null);
  const fromRef = useRef(target);
  const toRef = useRef(target);
  const startRef = useRef(null);

  useEffect(() => {
    if (reducedMotion) {
      setDisplay(target);
      fromRef.current = target;
      toRef.current = target;
      return;
    }

    fromRef.current = display;
    toRef.current = target;
    startRef.current = null;

    const animate = (timestamp) => {
      if (!startRef.current) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = fromRef.current + (toRef.current - fromRef.current) * eased;
      setDisplay(Math.round(current));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [target, duration, reducedMotion]);

  return display;
}

export function formatNaira(n) {
  return "\u20A6" + Math.round(n).toLocaleString("en-NG");
}
