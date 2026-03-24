---
phase: "03"
plan: "01"
subsystem: "cms"
tags: ["decap-cms", "stiati-ca", "content-collections"]
key-files:
  modified:
    - static/admin/config.yml
decisions:
  - "imagine_card marcat required: false — câmpul este opțional conform front matter existent"
  - "draft cu widget: boolean și default: false — corespunde exact front matter-ului"
metrics:
  completed_date: "2026-03-25"
  tasks: 1
  files_modified: 1
---

# Phase 03 Plan 01: Colecție stiati-ca în Decap CMS — Summary

Adăugat colecția `stiati-ca` în configurația Decap CMS, cu câmpuri care corespund exact front matter-ului existent în `content/stiati-ca/`.

## Ce s-a făcut

Adăugat bloc de colecție nouă în `/home/bogdan/proiecte/happybees/static/admin/config.yml`, între colecțiile `articole` și `pages`:

- `name: "stiati-ca"` — identificator intern CMS
- `folder: "content/stiati-ca"` — mapează la secțiunea Hugo existentă
- `create: true` — permite crearea de articole noi direct din CMS
- Câmpuri: `title`, `date`, `descriere_scurta`, `imagine_card` (opțional), `draft`, `body`

## Verificare acceptance criteria

| Criteriu | Rezultat |
|---|---|
| `grep "stiati-ca"` >= 2 rezultate | 2 rezultate |
| `grep "create: true"` >= 2 rezultate | 3 rezultate (produse + articole + stiati-ca) |
| `grep "descriere_scurta"` >= 1 rezultat | 2 rezultate |
| `grep "imagine_card"` >= 1 rezultat | 2 rezultate |
| YAML valid, indentare corectă | Confirmat |

## Commit

- `f1d6e7b` — feat(03): add stiati-ca collection to Decap CMS config

## Deviations from Plan

None — plan executat exact conform specificației.

## Self-Check: PASSED

- Fișier modificat: `/home/bogdan/proiecte/happybees/static/admin/config.yml` — EXISTS
- Commit `f1d6e7b` — EXISTS
