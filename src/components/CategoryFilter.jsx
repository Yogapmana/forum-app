function CategoryFilter({ categories, selected, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <button
        type="button"
        onClick={() => onSelect('')}
        className={`px-3 py-1 rounded-full text-sm border transition
          ${!selected
          ? 'bg-primary dark:bg-accent text-white border-primary dark:border-accent'
          : 'bg-white dark:bg-dark-card text-primary dark:text-gray-300 border-gray-300 dark:border-dark-border hover:border-primary dark:hover:border-accent'}
        `}
      >
        Semua
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          type="button"
          onClick={() => onSelect(cat)}
          className={`px-3 py-1 rounded-full text-sm border transition
            ${selected === cat
            ? 'bg-primary dark:bg-accent text-white border-primary dark:border-accent'
            : 'bg-white dark:bg-dark-card text-primary dark:text-gray-300 border-gray-300 dark:border-dark-border hover:border-primary dark:hover:border-accent'}
          `}
        >
          #
          {cat}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
