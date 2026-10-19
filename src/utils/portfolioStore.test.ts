import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

class MemoryStorage implements Storage {
  private values = new Map<string, string>();

  get length() {
    return this.values.size;
  }

  clear() {
    this.values.clear();
  }

  getItem(key: string) {
    return this.values.get(key) ?? null;
  }

  key(index: number) {
    return Array.from(this.values.keys())[index] ?? null;
  }

  removeItem(key: string) {
    this.values.delete(key);
  }

  setItem(key: string, value: string) {
    this.values.set(key, String(value));
  }
}

let portfolioStore: typeof import('./portfolioStore');

beforeAll(async () => {
  vi.stubGlobal('localStorage', new MemoryStorage());
  vi.stubGlobal('window', { dispatchEvent: vi.fn() });
  vi.stubGlobal('CustomEvent', class {
    constructor(public type: string, public init?: { detail?: unknown }) {}
  });
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }));
  portfolioStore = await import('./portfolioStore');
});

afterAll(() => {
  vi.unstubAllGlobals();
});

beforeEach(() => {
  localStorage.clear();
});

describe('professional reference management', () => {
  it('creates, updates, and deletes references, including the last one', () => {
    const reference = portfolioStore.addStoredReference({
      name: 'Academic Coordinator',
      role: 'English Version In-Charge',
      company: 'Example School',
      email: 'coordinator@example.edu',
      phone: '+880 1000000000',
      quote: 'A thoughtful and dedicated educator.',
    });

    expect(reference.id).toBeTruthy();
    expect(portfolioStore.getStoredReferences()).toContainEqual(reference);

    const referenceId = reference.id;
    if (!referenceId) throw new Error('Expected a generated reference ID.');

    expect(portfolioStore.updateStoredReference(referenceId, {
      role: 'Senior Academic Coordinator',
      quote: 'An exceptional educator and colleague.',
    })).toBe(true);
    expect(portfolioStore.getStoredReferences().find(item => item.id === referenceId)).toMatchObject({
      role: 'Senior Academic Coordinator',
      quote: 'An exceptional educator and colleague.',
    });

    portfolioStore.saveStoredReferences([]);
    const onlyReference = portfolioStore.addStoredReference({
      name: 'School Principal',
      role: 'Principal',
      company: 'Another School',
      email: 'principal@example.edu',
      phone: '+880 1000000001',
    });
    const onlyReferenceId = onlyReference.id;
    if (!onlyReferenceId) throw new Error('Expected a generated reference ID.');

    expect(portfolioStore.deleteStoredReference(onlyReferenceId)).toBe(true);
    expect(portfolioStore.getStoredReferences()).toEqual([]);
  });
});
