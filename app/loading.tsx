import Skeleton from "@/components/Skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-40 w-full h-16 sm:h-20 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800" />

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 pb-12 sm:pt-16 sm:pb-24 space-y-12 sm:space-y-16">
        <section className="space-y-8">
          <div className="flex flex-col gap-4">
            <Skeleton className="h-6 w-40 rounded-full" />
            <Skeleton className="h-10 w-96" />
            <Skeleton className="h-5 w-72" />
          </div>

          <Skeleton className="h-12 w-full rounded-2xl" />

          <div className="space-y-16">
            {[1, 2, 3].map((section) => (
              <div key={section} className="space-y-6">
                <Skeleton className="h-8 w-48" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {[1, 2, 3, 4].map((card) => (
                    <div key={card} className="rounded-3xl border border-neutral-800 overflow-hidden">
                      <Skeleton className="aspect-[4/3] w-full" />
                      <div className="p-5 space-y-3">
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-1/2" />
                        <div className="flex justify-between items-center pt-3 border-t border-neutral-800">
                          <Skeleton className="h-7 w-24" />
                          <Skeleton className="h-7 w-20 rounded-xl" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
