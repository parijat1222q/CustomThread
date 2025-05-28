import { HOW_IT_WORKS_STEPS } from '@/constants';
import { Container } from '@/components/shared/container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function HowItWorksSection() {
  return (
    <div className="bg-secondary/50">
      <Container>
        <h2 className="text-3xl font-bold text-center text-foreground mb-12">How It Works</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {HOW_IT_WORKS_STEPS.map((step, index) => (
            <Card key={index} className="text-center shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
                  <step.icon className="h-8 w-8" />
                </div>
                <CardTitle className="text-xl font-semibold text-foreground">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
}
