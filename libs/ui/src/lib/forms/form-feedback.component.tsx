import classnames from 'classnames';
import React from 'react';
import { FiXCircle } from 'react-icons/fi';

type FormFeedbackProps = {
  type: 'warning' | 'info' | 'success' | 'error';
  message: string;
};
export const FormFeedback: React.FC<FormFeedbackProps> = ({
  type,
  message,
}) => {
  return (
    <div
      className={classnames('rounded-md p-4', {
        'bg-red-50': type === 'error',
        'bg-yellow-50': type === 'warning',
        'bg-blue-50': type === 'info',
        'bg-green-50': type === 'success',
      })}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <FiXCircle
            className={classnames('h-5 w-5', {
              'text-red-400': type === 'error',
              'text-yellow-400': type === 'warning',
              'text-blue-400': type === 'info',
              'text-green-400': type === 'success',
            })}
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <h3
            className={classnames('text-sm font-medium', {
              'text-red-800': type === 'error',
              'text-yellow-800': type === 'warning',
              'text-blue-800': type === 'info',
              'text-green-800': type === 'success',
            })}
          >
            {message}
          </h3>
        </div>
      </div>
    </div>
  );
};
