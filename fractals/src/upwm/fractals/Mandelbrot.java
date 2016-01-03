package upwm.fractals;

public class Mandelbrot implements FractalSet {
	public static int MAX_ITERATIONS = 60;

	@Override
	public int getMaxIterations() {
		return MAX_ITERATIONS;
	}
	
	@Override
	public int check(Complex p) {
		int i = 0;
		Complex z = Complex.ZERO;
		while (z.modulusSqr() < 4 && i < MAX_ITERATIONS) {
			z = z.sqr().add(p);
			i++;
		}
		return i;
	}
}
