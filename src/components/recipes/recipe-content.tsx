import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface RecipeContentProps {
  content: string
}

export function RecipeContent({ content }: RecipeContentProps) {
  return (
    <div className="space-y-4 leading-7">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: props => (
            <h2 className="mt-8 text-2xl font-bold tracking-tight" {...props} />
          ),
          h2: props => (
            <h2 className="mt-8 text-2xl font-bold tracking-tight" {...props} />
          ),
          h3: props => <h3 className="mt-6 text-xl font-semibold" {...props} />,
          ul: props => <ul className="list-disc space-y-1 pl-6" {...props} />,
          ol: props => (
            <ol className="list-decimal space-y-1 pl-6" {...props} />
          ),
          a: props => (
            <a
              className="text-primary underline underline-offset-4"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),
          blockquote: props => (
            <blockquote
              className="border-primary/40 text-muted-foreground border-l-4 pl-4 italic"
              {...props}
            />
          ),
          hr: () => <hr className="my-6" />,
          code: ({ className, ...props }) => (
            <code
              className={
                className ?? 'bg-muted rounded px-1.5 py-0.5 font-mono text-sm'
              }
              {...props}
            />
          ),
          pre: props => (
            <pre
              className="bg-muted overflow-x-auto rounded-lg p-4 text-sm"
              {...props}
            />
          ),
          table: props => (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm" {...props} />
            </div>
          ),
          th: props => (
            <th
              className="border px-3 py-2 text-left font-semibold"
              {...props}
            />
          ),
          td: props => <td className="border px-3 py-2" {...props} />,
          img: ({ src, alt }) =>
            typeof src === 'string' ? (
              <Image
                src={src}
                alt={alt ?? ''}
                width={800}
                height={600}
                sizes="(min-width: 768px) 768px, 100vw"
                className="h-auto w-full rounded-lg"
              />
            ) : null,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
