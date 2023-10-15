export const Input = ({ register, errors, id, labelText, type, rules }) => {
  return (
    <>
      <label htmlFor={id} className="form-label">
        {labelText}
      </label>
      <input
        type={type}
        className={`form-control ${errors[id] && "is-invalid"}`}
        {...register(id, rules)}
      />
      {errors[id] && (
        <div className="invalid-feedback">{errors[id]?.message}</div>
      )}
    </>
  );
};

export const Select = ({
  register,
  errors,
  id,
  labelText,
  rules,
  children,
  disabled = false,
}) => {
  return (
    <>
      <label htmlFor={id} className="form-label">
        {labelText}
      </label>
      <select
        id={id}
        className={`form-select ${errors[id] && "is-invalid"}`}
        {...register(id, rules)}
        disabled={disabled}
      >
        {children}
      </select>
      {errors[id] && (
        <div className="invalid-feedback">{errors[id]?.message}</div>
      )}
    </>
  );
};

export const CheckboxRadio = ({
  register,
  errors,
  id,
  labelText,
  name,
  type,
  rules,
  value,
}) => {
  return (
    <>
      <div className="form-check">
        <input
          type={type}
          className={`form-check-input ${errors[id] && "is-invalid"}`}
          id={id}
          name={name}
          value={value}
          {...register(id, rules)}
        />
        <label htmlFor={id} className="form-check-label">
          {labelText}
        </label>
        {errors[name] && (
          <div className="invalid-feedback">{errors[name]?.message}</div>
        )}
      </div>
    </>
  );
};
