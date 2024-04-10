import * as React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  isLoading?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type, isLoading = false, disabled, id, ...props }, ref) => {
    const [isVisible, setIsVisible] = React.useState(false);
    const isDisabled = disabled || isLoading;

    return (
      <div>
        <input
          disabled={isDisabled}
          id={id}
          ref={ref}
          type={type === "password" && isVisible ? "text" : type}
          {...props}
        />
        {type === "password" && (
          <button
            aria-controls={id}
            aria-expanded={isVisible}
            disabled={disabled}
            onClick={() => setIsVisible((previousState) => !previousState)}
            type="button"
          >
            {isVisible ? <div>EyeIcon</div> : <div>EyeOffIcon</div>}
          </button>
        )}
        {isLoading ? <div>Loading</div> : null}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
