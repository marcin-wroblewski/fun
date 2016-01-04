package upwm.fractals;

public interface FractalSet {

	int getMaxIterations();

	int check(Complex p);

	void setMaxIterations(int iterations);

}
