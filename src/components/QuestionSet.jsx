import React, { useState } from 'react';

const norm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9£% ]/g, '').replace(/\s+/g, ' ').trim();

export function grade(questions, answers) {
  return questions.map((q, i) => {
    const given = answers[i];
    if (given == null || given === '') return false;
    const pool = q.accept ? q.accept : [q.a];
    return pool.some((p) => norm(p) === norm(given));
  });
}

export default function QuestionSet({ questions, answers, setAnswers, checked }) {
  const results = checked ? grade(questions, answers) : [];

  const set = (i, v) => setAnswers({ ...answers, [i]: v });

  return (
    <div className="qset">
      {questions.map((q, i) => {
        const ok = results[i];
        return (
          <div className="q" key={i}>
            <p className="q-text"><span className="q-no">{i + 1}</span>{q.q}</p>

            {q.type === 'choice' ? (
              <div className="opts">
                {q.opts.map((o) => {
                  let cls = 'opt';
                  if (checked) {
                    if (o === q.a) cls += ' right';
                    else if (answers[i] === o) cls += ' wrong';
                  } else if (answers[i] === o) cls += ' picked';
                  return (
                    <button key={o} className={cls} disabled={checked} onClick={() => set(i, o)}>
                      {o}
                    </button>
                  );
                })}
              </div>
            ) : (
              <input
                type="text"
                value={answers[i] || ''}
                disabled={checked}
                placeholder="Type your answer"
                onChange={(e) => set(i, e.target.value)}
                style={{ maxWidth: '420px' }}
              />
            )}

            {checked && (
              <p className={`verdict ${ok ? 'right' : 'wrong'}`}>
                {ok ? 'Correct. ' : `Answer: ${q.a}. `}{q.why}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
